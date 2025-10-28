import { useParams } from "react-router-dom";
import peopleWalking from '../images/people-walking.jpg'
const About = () => {
    const { about }=useParams();

    return(
        <div id="about-container">
            {/*Here is an added image with alt text to satisfy requirement*/}
            <img id="people-walking" src={peopleWalking} alt="An above head view of people walking along a crosswalk" />
            <section id="about">
                <h1>How Calling Card came into existence</h1>
                    <p>Calling card first crept into my mind when I went to a networking event. When I realized that I had not brought any of my business cards
                        to the event, I wished there was an app to generate a quick business card so I could give it to anyone that might want my contact information.

                        <p id="attn">Thus, Calling Card was calling.</p> 

                        While Calling Card was perfect for my situation, it could be perfect for you! Are you:
                    </p>
                    {/*This is a list with very brief user stories*/}
                    <ul id="about-list">
                        <li>A college student who would rather avoid paying for 100s of physical business cards</li>
                        <li>A parent wanting a quick and easy way to share contact info with fellow parents in your child's classroom</li>
                        <li>A person meeting people at a bar looking for a unique way to share contact information</li>
                    </ul>
                    <p>If there is any reason you could use a digital contact card, Calling Card is for you!</p>
            </section>
        </div>
    )
}
export default About