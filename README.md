# RYMCO Dashboard

Dashboard industrial en tiempo real para monitoreo de máquinas de manufactura de tubos Tibo Conduit. Recibe datos vía WebSocket desde Node-RED y muestra métricas en vivo con diales circulares, información de órdenes de producción, gráficas históricas y sistema de alarmas.

## Stack

- React 19 + Vite 8 + TypeScript + Tailwind CSS v4
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

## Variables de entorno

| Variable | Descripción | Default |
|---|---|---|
| `VITE_SOCKET_URL` | URL del WebSocket (Node-RED) | `ws://localhost:8080` |
| `VITE_USE_MOCKS` | Activar modo simulación (`true`/`false`) | `false` |

## Estructura

```
src/
├── types/          # Interfaces puras (MaquinaData, Variables, Alarma)
├── config/         # Definición centralizada de máquinas
├── context/        # 4 providers: Socket, Alarma, Clock, Tema
├── hooks/          # 1:1 hooks por contexto
├── layout/         # Layout + Header + Sidebar
├── pages/          # Home (/) + MaquinaPage (/maquina/:id)
├── components/
│   ├── ui/         # Atómicos: Panel, Badge, ConnectionStatus
│   ├── dials/      # DialGauge (SVG) + DialCard
│   ├── informativo/# EstadoCard + OdtDesArtCard + TonejaleCard
│   ├── graficas/   # LineChart + BarChart + ChartPanel
│   └── alarmas/    # AlarmPanel + AlarmList + AlarmItem
├── utils/          # Funciones puras (getColor, alarmLogic)
├── styles/         # Constantes de estilo y tema
└── mocks/          # Datos mock para desarrollo offline
```

## Modo simulación

Para desarrollo sin acceso al WebSocket, activar el modo mock:

```bash
# En .env
VITE_USE_MOCKS='true'
```

El dashboard mostrará datos simulados que se actualizan cada 3 segundos, con alarmas generadas automáticamente. El header muestra "Simulación" en amarillo.

Si el WebSocket falla tras 5 intentos, el sistema activa el modo mock automáticamente.

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

| ID | Nombre |
|---|---|
| mxm001 | Molino 1 |
| mxm002 | Molino 2 |
| mxm003 | Molino 3 |
| mxsl1 | Slitter |
| mxrs1 | Roscadora |

Para agregar máquinas, editar `src/config/maquinas.ts`.

## Tema

- Oscuro por defecto (bg `#0f172a`, paneles `#1e293b`)
- Toggle claro/oscuro en el Header
- Persistencia en `localStorage`

## Despliegue

Build servido en `/linkfactory/dashboardMX/dist/` (configurado en `vite.config.ts`).

## Enlaces

- Grafana: `http://monitormx.rymco.io:9030/public-dashboards/<uuid>`
- WebSocket: configurable via `VITE_SOCKET_URL` en `.env`
