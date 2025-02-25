import { AppRouter } from "./routes/app-router"
import { QueryClientProvider } from "@tanstack/react-query";
import reactQueryClient from "./api/query-client";

function App() {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <AppRouter />
    </QueryClientProvider>
  )
}

export default App
