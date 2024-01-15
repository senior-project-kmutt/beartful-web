import { useForm } from "react-hook-form";

interface Props {
  
}

type FormData = {
    freelanceId: number
    images: Array<string>
    name: string
    description: string
    price: string
    type: string
    categoryId: number
    likeCount: number
  };

const ArtworkForm = (props: Props) => {

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => console.log(data));


  return (
    <>
      <div>
      <form onSubmit={onSubmit}>
      <label>Name</label>
      <input {...register("name")} />
      <label>Description</label>
      <input {...register("description")} />
      <label>Price</label>
      <input {...register("price")} />
      <select {...register("type")}>
        <option value="hired">hired</option>
        <option value="readyMade">readyMade</option>
      </select>
      {/* <button
        type="button"
        onClick={() => {
          setValue("name", "luo"); // ✅
          setValue("description", "true"); // ❌: true is not string
        //   errors.bill; // ❌: property bill does not exist
        }}
      >
        SetValue
      </button> */}
      <input type="submit" />
    </form>
      </div>
    </>
  );
};

export default ArtworkForm;
