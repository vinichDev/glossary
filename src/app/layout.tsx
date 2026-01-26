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
      <body>
        {children}S
      </body>
    </html>
  );
};

export default RootLayout;
