import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

export default function About(): JSX.Element {
  
   const navigate = useNavigate();

   function retour() {
        navigate(-1)
   }
  
  return (
    <>
        <button className="button-primary" onClick={retour}>Retour</button>
        <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
        minus pariatur maiores eum minima repellat laborum blanditiis hic, ea vero
        voluptates ullam ducimus perspiciatis est rerum dignissimos facilis
        cupiditate! Deleniti minus nam consequuntur dolorum velit nobis quos natus
        voluptatum error. Ex corporis porro dolor iure explicabo ratione sit
        laudantium molestiae.
        </div>
    </>
  );
}
