import { Request, Response } from "express";
import { getRepository } from "typeorm";
import axios from "axios";
import { Driver } from "../models/Driver";

// Função para calcular a distância e o tempo com a API do Google
const getGoogleRouteData = async (origin: string, destination: string) => {
  const googleApiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${googleApiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const route = response.data.routes[0].legs[0];
      const distance = route.distance.text;
      const duration = route.duration.text;
      const startLatLng = route.start_location;
      const endLatLng = route.end_location;

      return {
        distance,
        duration,
        startLatLng,
        endLatLng,
        googleResponse: response.data,
      };
    } else {
      throw new Error("Error fetching route data from Google API");
    }
  } catch (error) {
    throw new Error("Error fetching route data: " + error.message);
  }
};

// Função para buscar motoristas e calcular os custos
export const calculateCost = async (req: Request, res: Response) => {
  const { customer_id, origin, destination } = req.body;

  // Validação dos dados
  if (!customer_id || !origin || !destination) {
    return res.status(400).json({
      status: "error",
      message: "Os dados fornecidos no corpo da requisição são inválidos.",
    });
  }

  try {
    // Buscando a rota no Google
    const routeData = await getGoogleRouteData(origin, destination);

    // Buscando motoristas no banco de dados
    const drivers = await getRepository(Driver).find();

    // Ordenando motoristas do mais barato para o mais caro
    const driversWithCost = drivers.map((driver) => {
      const totalCost = driver.pricePerKm * parseFloat(routeData.distance.split(' ')[0]);
      return {
        id: driver.id,
        name: driver.name,
        description: driver.description,
        car: driver.car,
        assessment: driver.assessment,
        totalCost,
      };
    }).sort((a, b) => a.totalCost - b.totalCost);

    // Retornando a resposta com todos os dados
    return res.json({
      status: "success",
      message: "Operação realizada com sucesso.",
      distance: routeData.distance,
      duration: routeData.duration,
      startLatLng: routeData.startLatLng,
      endLatLng: routeData.endLatLng,
      drivers: driversWithCost,
      googleResponse: routeData.googleResponse,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Erro interno do servidor.",
    });
  }
};
