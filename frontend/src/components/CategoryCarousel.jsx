import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const category = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "UI/UX Designer",
  "Product Manager",
  "Business Analyst",
  "DevOps Engineer",
  "Cloud Architect",
  "Machine Learning Engineer",
  "Mobile App Developer",
  "Cybersecurity Analyst",
  "Quality Assurance Engineer",
  "Technical Support Engineer",
  "Systems Administrator",
  "Network Engineer",
  "Database Administrator",
  "Game Developer",
  "Digital Marketing Specialist",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBrowseSearch = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="my-10 px-4 relative">
      <h2 className="text-2xl font-bold text-center mb-6">
        Explore Job Categories
      </h2>
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {category.map((cat, ind) => (
            <CarouselItem
              key={ind}
              className="basis-1/1 md:basis-1/2 lg:basis-1/3 px-2"
            >
              <Button
               onClick={()=>{handleBrowseSearch(cat)}}
                variant="outline"
                className="w-full text-sm font-medium rounded-full border-gray-300"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="sm:block block left-[-5px] " />
        <CarouselNext className="sm:block block right-[-0px]" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
