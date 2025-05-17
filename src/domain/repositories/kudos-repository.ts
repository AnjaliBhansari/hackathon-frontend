import { Kudos } from "@/domain/entities/kudos";

export interface KudosRepository {
  getAllKudos(): Promise<Kudos[]>;
} 