import { Link } from "react-router-dom";
import Button from "./Button";
const Landing = () => {
    return (
        <div>
            <main id="landing">
                <h1 >Need a calling card?</h1><br/>
                <p>No need to order physical cards anymore!</p>
                <p>Create a custom contact card and save it for distribution.</p>
                    <div>
                        {/*The main part of this page is the get started button that links directly to the create page*/}
                        <Link to="/create">
                            <Button id="btn" label="Start Creating"  />
                        </Link>  
                    </div>
            </main>
        </div>
    );
}

export default Landing

//