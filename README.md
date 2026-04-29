# Finance Studio

App web financiera personal creada con React, Tailwind CSS y Recharts.

## Que incluye

- Dashboard con ingreso mensual editable, gastos, deudas, IRS, ahorro, sobrante y estado del mes.
- Gastos fijos, variables, suscripciones, ahorro y recurrencias con conversion mensual automatica.
- Seccion para 6 tarjetas de credito con balance, pago minimo, pago recomendado, APR, fechas, estado y notas.
- Seccion IRS editable con alertas.
- Calendario financiero mensual con eventos editables, pagos del dia, proximos 7 dias y proximos 30 dias.
- Centro de alertas con colores por severidad.
- Graficos de categorias, ingresos vs gastos, balance historico, suscripciones, deuda por tarjeta y flujo de dinero.
- Deteccion de fugas de dinero y consejos automaticos.
- Presupuesto mensual con barras de progreso.
- Historico mensual.
- Exportacion de movimientos CSV, resumen CSV y reporte mensual.
- Persistencia en `localStorage`.
- Modo claro y oscuro.

## Como correr la app

1. Instala Node.js LTS desde https://nodejs.org si no lo tienes.
2. Abre una terminal en esta carpeta.
3. Instala dependencias:

```bash
npm install
```

4. Levanta el servidor local:

```bash
npm run dev
```

5. Abre la URL que muestra Vite, normalmente:

```text
http://localhost:5173
```

## Build de produccion

```bash
npm run build
```

## Nota

La app no conecta con bancos reales. Todos los datos se guardan localmente en el navegador.
