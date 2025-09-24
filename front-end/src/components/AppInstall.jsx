import playStore from "../assets/playstore.png";
import appStore from "../assets/appstore.png";

function AppInstall() {
    return (
        <div className="flex gap-3">
            <img src={playStore} alt="play store" className="h-10" />
            <img src={appStore} alt="app store" className="h-10" />
        </div>
    )
}

export default AppInstall