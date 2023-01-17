import { RootLayoutProps } from "../types/props";

const RootLayout: React.FC<RootLayoutProps> = ({children}) => {
    return (
        <section className="w-full max-w-[1500px] my-0 mx-auto">
            {children}
        </section>
    );
};

export default RootLayout;