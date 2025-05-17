import { KudosRepository } from "@/domain/repositories/kudos-repository";
import { Kudos } from "@/domain/entities/kudos";

export class GetAllKudosUseCase {
  constructor(private kudosRepository: KudosRepository) {}

  async execute(): Promise<Kudos[]> {
    return this.kudosRepository.getAllKudos();
  }
} 