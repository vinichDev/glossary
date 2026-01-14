import "./globals.scss";

export const metadata = {
  title: "Глоссарий терминов",
  description: "Глоссарий терминов проекта с mindmap и Web API"
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
