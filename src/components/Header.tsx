import GitHubIcon from "../assets/icons/github-icon.svg";

const Header: React.FC = () => {
    return (
        <header className="w-full flex justify-between items-center border-2 p-3">
            <p className="text-4xl font-bold text-[#2c2c2c]">
                Task.<span className="text-blue-400">in</span>
            </p>

            <div className="flex gap-3">
                <img 
                    src={GitHubIcon} 
                    alt="GitHub Link" 
                    className="w-[42px] h-[42px] cursor-pointer"
                />
            </div>
        </header>
    );
};

export default Header;