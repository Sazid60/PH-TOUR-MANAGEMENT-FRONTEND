import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";

const AddTourType = () => {
    const {data} = useGetTourTypesQuery(undefined)
    console.log(data)
  return (
    <div>
      <h1>This is AddTourType component</h1>
    </div>
  );
};

export default AddTourType;