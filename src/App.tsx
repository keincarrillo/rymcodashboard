import { HashRouter, Routes, Route } from "react-router-dom"
import { TemaProvider } from "./context/TemaContext"
import { ClockProvider } from "./context/ClockContext"
import { SocketProvider } from "./context/SocketContext"
import { AlarmaProvider } from "./context/AlarmaContext"
import { Layout } from "./layout/Layout"
import { Home } from "./pages/Home"
import { MaquinaPage } from "./pages/MaquinaPage"

function App() {
  return (
    <TemaProvider>
      <ClockProvider>
        <SocketProvider>
          <AlarmaProvider>
            <HashRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/maquina/:id" element={<MaquinaPage />} />
                </Routes>
              </Layout>
            </HashRouter>
          </AlarmaProvider>
        </SocketProvider>
      </ClockProvider>
    </TemaProvider>
  )
}

export default App