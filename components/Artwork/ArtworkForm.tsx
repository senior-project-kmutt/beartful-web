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
      <label>ชื่อผลงาน</label>
      <input {...register("name")} />
      <label>รายละเอียด</label>
      <input {...register("description")} />
      <label>ราคา</label>
      <input {...register("price")} />
      <select {...register("type")}>
        <option value="hired">Hired</option>
        <option value="readyMade">Ready Made</option>
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
