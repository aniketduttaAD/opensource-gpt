import { LandingComponent } from "@/components/landing-component";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";

const LandingPage=()=>{
    return(
        <div className="h-full">
            <LandingNavbar />
            <LandingHero />
            <LandingComponent />
        </div>
    );
}

export default LandingPage;