# ValoraIA

Plataforma profesional de valuación inmobiliaria asistida.

## Módulos incluidos

- Autenticación, organizaciones y permisos RLS.
- Expediente digital e inmueble.
- Almacenamiento privado de documentos.
- Inteligencia documental mediante Supabase Edge Functions.
- Extracción, evidencia y conciliación documental.
- Comparables y homologación.
- Enfoques de mercado, costos e ingresos.
- Reconciliación, rango de valor y confianza.
- Informe imprimible / PDF.
- Auditoría y trazabilidad.

## Despliegue en Render

La rama `valoraia-production` incluye `render.yaml`.

1. En Render: **New > Blueprint**.
2. Seleccionar `danfelito/Pagina-web-demo`.
3. Elegir la rama `valoraia-production`.
4. Confirmar el servicio `valoraia`.

Render utilizará:

- Build: `npm run check`
- Start: `npm start`
- Health check: `/health`

## OpenAI

La clave `OPENAI_API_KEY` se configura exclusivamente en **Supabase > Edge Functions > Secrets**. Nunca debe agregarse al repositorio ni a Render.

## Aviso profesional

Los resultados automatizados son preliminares y no sustituyen la firma de un perito autorizado cuando la finalidad legal, fiscal, bancaria o judicial lo requiera.
