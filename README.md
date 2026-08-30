# SSR Knit Fabrics

Interactive React + Vite frontend for SSR Knit Fabrics, including a party-facing website and an official admin portal.

## Run on macOS

```bash
npm install
npm run dev
```

Open the Vite URL, normally `http://localhost:5173/`.

## Party side

- View SSR Knit Fabrics company information
- Explore the three Terrot machines
- View machine specifications
- Submit an order enquiry
- Receive an Order ID
- Track order status and production quantity

## Admin side

Click **Admin Portal** in the website header or open:

`http://localhost:5173/#admin`

Demo credentials for this frontend prototype:

- Username: `admin`
- Password: `admin123`

Admin capabilities:

- View incoming party orders
- Search orders
- Accept or reject pending requests
- Change order status
- Update completed production quantity
- Set expected completion date
- Changes are stored in browser localStorage and immediately used by the party tracking interface

## Important

This is a frontend prototype. The localStorage layer demonstrates the complete party → admin → production-update flow. For production deployment, replace it with a secure backend/database, real authentication, official notifications, and server-side authorization.
