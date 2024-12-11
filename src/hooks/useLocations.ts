import { useQuery } from '@tanstack/react-query'
import { SpotSeekerAPI } from '../api'

const api = new SpotSeekerAPI()

export const useLocations = (q: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['Locations', q],
    queryFn: () => (q ? api.post.getLoc(q) : Promise.resolve([])), // Evitar ejecutar si query está vacío
    enabled: !!q, // Suspender la consulta si query está vacío
    staleTime: 5000 // Opcional: Evitar refetches frecuentes
    // Opcional: Tiempo de almacenamiento en caché
  })

  return { results: data || [], isLoading, error }
}
