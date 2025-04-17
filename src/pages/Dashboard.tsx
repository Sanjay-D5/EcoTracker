import { FC, memo, useEffect, useState } from 'react';
import { TreePalm, Leaf } from 'lucide-react';
import { projects } from '../constants';
import { ProjectCard } from '@/components';
import { getUserImpactHistory } from '@/appwrite/actions/userAction'; 
import { getCurrentUser } from '@/appwrite/actions/authServices';

interface CarbonFootprintData {
  totalFootprint: number;
  latestEntry: {
    date: string;
    carbon_footprint: number;
  };
  historyData: any[];
}

const DashboardHeader: FC<{ username?: string; carbonData?: CarbonFootprintData }> = memo(
  ({ username = "User", carbonData }) => (
    <section className="bg-white p-6 mb-8 rounded-2xl shadow-lg border border-emerald-100 transition-all hover:shadow-xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back, {username}!</h1>
          <p className="text-gray-600 mt-1">Here's an overview of your sustainability impact</p>
        </div>
        <div className="bg-emerald-50 p-2 rounded-lg">
          <span className="text-xs font-medium text-emerald-700">
            Last updated: {carbonData?.latestEntry?.date ? new Date(carbonData.latestEntry.date).toLocaleDateString() : 'Today'}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {carbonData && (
          <div className="p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
            <h3 className="font-semibold text-white">Current Carbon Footprint</h3>
            <p className="text-3xl mt-1 font-bold text-white">
              {carbonData.latestEntry?.carbon_footprint.toLocaleString()} kg CO₂
            </p>
            <p className='text-gray-200 text-sm'>This month</p>
          </div>
        )}
      </div>
    </section>
  )
);

const Dashboard: FC = () => {
  const [username, setUsername] = useState<string>("User");
  const [carbonData, setCarbonData] = useState<CarbonFootprintData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Get current user
        const user = await getCurrentUser();
        
        if (user) {
          setUsername(user.name || "User");
          
          // Get user impact history
          const impactHistory = await getUserImpactHistory(user.$id);
          console.log(impactHistory);
          
          if (impactHistory && impactHistory.length > 0) {
            // Calculate total footprint across all entries
            const totalFootprint = impactHistory.reduce(
              (sum, entry) => sum + (entry.carbon_footprint || 0), 
              0
            );
            
            // Extract the latest entry
            const latestEntry = {
              date: impactHistory[0].date,
              carbon_footprint: impactHistory[0].carbon_footprint,
            }; 
            
            setCarbonData({
              totalFootprint,
              latestEntry,
              historyData: impactHistory
            });
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load your sustainability data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-emerald-50 py-8">
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="text-center py-10">Loading your data...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <>
            <DashboardHeader username={username} carbonData={carbonData || undefined} />
            
            {/* Carbon History Section */}
            {carbonData && carbonData.historyData.length > 0 && (
              <section className="bg-white backdrop-blur-md rounded-2xl p-6 shadow-lg border border-emerald-50 transition-all hover:shadow-xl mb-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center">
                    <Leaf className="text-emerald-500" />
                    <h2 className="ml-2 font-semibold text-xl">Your Carbon Footprint History</h2>
                  </div>
                </div>
                <div className="space-y-4">
                  {carbonData.historyData.slice(0, 3).map((entry, index) => (
                    <div key={index} className="p-4 bg-emerald-50 rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                        <span className="font-bold text-emerald-700">
                          {entry.carbon_footprint.toLocaleString()} kg CO₂
                        </span>
                      </div>
                      {entry.top_recommendations && (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Top Recommendation:</span>{' '}
                          {JSON.parse(entry.top_recommendations)[0]?.title || 'None available'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-white backdrop-blur-md rounded-2xl p-6 shadow-lg border border-emerald-50 transition-all hover:shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center">
                  <TreePalm className="text-emerald-500" />
                  <h2 className="ml-2 font-semibold text-xl">Carbon Offset Projects</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.title} {...project} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default memo(Dashboard);