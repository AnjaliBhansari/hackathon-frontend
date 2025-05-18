import { useEffect, useState, useCallback } from "react";
import { Kudos } from "@/domain/entities/kudos";
import { KudosRepositoryImpl } from "@/infrastructure/repositories/kudos-repository-impl";
import { GetAllKudosUseCase } from "@/application/use-cases/kudos/get-all-kudos";

export function useKudos() {
  const [kudos, setKudos] = useState<Kudos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKudos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const repository = new KudosRepositoryImpl();
      const useCase = new GetAllKudosUseCase(repository);
      const data = await useCase.execute();
      setKudos(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch kudos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKudos();
  }, [fetchKudos]);

  return { kudos, loading, error, refreshKudos: fetchKudos };
} 