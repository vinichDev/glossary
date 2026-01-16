import "./globals.scss";
import { YandexMetrika } from "@/shared/ui/YandexMetrika/YandexMetrika";

export const metadata = {
  title: "Глоссарий терминов",
  description: "Глоссарий терминов проекта с mindmap и Web API"
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  const metrikaId = process.env.NEXT_PUBLIC_METRIKA_ID;

  return (
    <html lang="ru">
      <body>
        <YandexMetrika counterId={metrikaId} />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
