# RYMCO Dashboard

Dashboard industrial en tiempo real para monitoreo de máquinas de manufactura de tubos Tibo Conduit. Recibe datos vía WebSocket desde Node-RED y muestra métricas en vivo con diales circulares, información de órdenes de producción, gráficas históricas y sistema de alarmas.

## Stack

- React 19 + Vite 7 + TypeScript + Tailwind CSS v4
- React Router v7 (HashRouter)
- Lucide React (iconos)
- Recharts (gráficas de línea y barras)
- Diales SVG custom (sin librería de gauge)

## Inicio rápido

```bash
# Instalar dependencias
bun install

# Variables de entorno
cp .env.example .env
# Editar VITE_SOCKET_URL (default: ws://localhost:8080)

# Desarrollo
bun dev

# Build producción
bun run build

# Lint
bun run lint
```

## Estructura

```
src/
├── types/          # Interfaces puras (MaquinaData, Variables, Alarma)
├── config/         # Definición de máquinas (agregar nuevas aquí)
├── context/        # 4 providers: Socket, Alarma, Clock, Tema
├── hooks/          # 1:1 hooks por contexto
├── layout/         # Layout + Header + Sidebar + MainContent
├── pages/          # Home (/) + MaquinaPage (/maquina/:id)
├── components/
│   ├── ui/         # Atómicos reutilizables
│   ├── dials/      # DialGauge (SVG) + DialCard
│   ├── informativo/# Estado + ODT + Tonelaje
│   ├── graficas/   # LineChart + BarChart + ChartPanel
│   └── alarmas/    # AlarmPanel + AlarmList + AlarmItem
├── utils/          # Funciones puras (getColor, formatValue, etc.)
├── styles/         # Constantes de estilo y tema
└── mocks/          # Datos mock para desarrollo offline
```

## Flujo de datos

```
Node-RED → WebSocket → SocketContext → AlarmaContext
                              ↓              ↓
                        MaquinaData[]    Alarmas[]
                              ↓
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
         MaquinaPage     DialCard       AlarmPanel
```

## Máquinas configuradas

| ID | Nombre | Variables |
|---|---|---|
| mxm001 | Molino 1 | 13 |
| mxm002 | Molino 2 | 8 |
| mxm003 | Molino 3 | 7 |
| mxsl1 | Slitter | — |
| mxrs1 | Roscadora | — |

Para agregar máquinas, editar `src/config/maquinas.tsx`.

## Tema

- Oscuro por defecto (bg `#0f172a`, paneles `#1e293b`)
- Toggle claro/oscuro en el Header
- Persistencia en `localStorage`

## Despliegue

Build servido en `/linkfactory/dashboardMX/dist/` (configurado en `vite.config.ts`).

## Enlaces

- Grafana: `http://monitormx.rymco.io:9030/public-dashboards/<uuid>`
- WebSocket: configurable via `VITE_SOCKET_URL` en `.env`
