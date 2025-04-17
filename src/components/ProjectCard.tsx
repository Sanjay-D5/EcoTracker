import { FC } from 'react';

interface ProjectCardProps {
  title: string;
  text: string;
  image: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ title, text, image }) => (
  <div className="relative rounded-xl overflow-hidden group">
    <img 
      src={image} 
      alt={title} 
      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    <div className="absolute z-20 left-0 bottom-0 text-white p-3">
      <h2 className="font-bold">{title}</h2>
      <p className="text-sm text-gray-200">{text}</p>
    </div>
  </div>
);

export default ProjectCard;