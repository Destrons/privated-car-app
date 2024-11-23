import { Request, Response } from 'express';
import { calculateRoute } from '../services/googleApiService';

const rideHistory = [];

export const requestRide = async (req: Request, res: Response) => {
  try {
    const { origin, destination, driver } = req.body;
    const routeData = await calculateRoute(origin, destination);

    const ride = {
      id: rideHistory.length + 1,
      origin,
      destination,
      driver,
      route: routeData,
    };

    rideHistory.push(ride);

    return res.status(200).json({ success: true, ride });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erro ao solicitar viagem' });
  }
};

export const getRideHistory = (req: Request, res: Response) => {
  return res.status(200).json({ success: true, history: rideHistory });
};
