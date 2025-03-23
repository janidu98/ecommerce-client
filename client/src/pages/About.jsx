import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ipsum
            ut inventore qui dolorum, iusto culpa minus tempore nihil ab placeat
            asperiores est modi quae, expedita nam fuga ea necessitatibus!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit alias
            a quae, placeat sequi mollitia neque quaerat consequuntur rerum
            autem quod sint minima itaque! Cupiditate perspiciatis rem cumque
            sed eius?
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
            laborum porro a harum nam perferendis sequi dolores ducimus tenetur
            nulla, illo, quae similique ex fugiat minus, quas ullam dolor optio.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
