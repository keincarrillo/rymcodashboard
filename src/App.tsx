import { HashRouter, Routes, Route } from "react-router-dom"
import { TemaProvider } from "./context/TemaContext"
import { Layout } from "./layout/Layout"
import { Home } from "./pages/Home"
import { MaquinaPage } from "./pages/MaquinaPage"

function App() {
  return (
    <TemaProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/maquina/:id" element={<MaquinaPage />} />
          </Routes>
        </Layout>
      </HashRouter>
    </TemaProvider>
  )
}

export default App