import { Kudos } from "@/domain/entities/kudos";
import { KudosRepository } from "@/domain/repositories/kudos-repository";

export class KudosRepositoryImpl implements KudosRepository {
  async getAllKudos(): Promise<Kudos[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/kudos`, {
      credentials: "include"
    });
    if (!response.ok) {
      throw new Error("Failed to fetch kudos");
    }
    return response.json();
  }
} 