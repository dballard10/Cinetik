interface MediaProductionCompaniesProps {
  production_companies: { id: number; name: string }[];
}

const MediaProductionCompanies = ({
  production_companies,
}: MediaProductionCompaniesProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-md font-semibold">Production Companies</h1>
      {production_companies.map((production_company) => (
        <div key={production_company.id} className="text-sm text-gray-400 mt-1">
          {production_company.name}
        </div>
      ))}
    </div>
  );
};

export default MediaProductionCompanies;
