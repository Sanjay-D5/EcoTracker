import { FC } from 'react';
import { TreePalm } from 'lucide-react';
import { projects, stats } from '../constants';
import { StatCard } from '../components/StatCard';
import { ProjectCard } from '../components/ProjectCard';

const Dashboard: FC = () => {
  return (
    <div className="min-h-screen bg-emerald-50">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-3 py-3">
        <section className="bg-white p-6 mb-8 rounded-2xl shadow-lg border border-emerald-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome Back!</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
        </section>

        <section className="bg-white backdrop-blur-md rounded-2xl p-6 shadow-lg border border-emerald-50">
          <div className="flex items-center mb-5">
            <TreePalm className="text-emerald-500" />
            <h2 className="ml-2 font-semibold text-xl">Carbon Offset Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;