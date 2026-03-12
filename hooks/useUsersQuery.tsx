import { config } from "@/config/config"
import { useQuery } from "@tanstack/react-query"

const useUsersQuery = (
    limit: number,
    skip: number,
    search: string,
) => {
    return useQuery({
        queryKey: ["users", limit, skip, search],
        queryFn: async () => {
            // Build URL with search parameter if provided
            let url = `${config.baseUrl}/users/search?limit=${limit}&skip=${skip}`
            
            if (search) {
                url += `&q=${encodeURIComponent(search)}`
            }
            
            const response = await fetch(url)
            
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            
            return response.json()
        },
    })
}

export default useUsersQuery