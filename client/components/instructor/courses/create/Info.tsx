// import { SelectCard } from "../../../cards";
// import { CategoryInput, Counter } from "../../../inputs";
// import { Heading, Title } from "../../../ui";
// import { categories } from "../../../ui/Categories/Categories";


// type Props = {
//   guestCount: number;
//   category?: any;
//   roomCount: number;
//   bathroomCount: number;
//   setCustomValue: (id: string, value: any) => void;
// };

// const Info = ({
//   guestCount,
//   roomCount,
//   bathroomCount,
//   category,
//   setCustomValue,
// }: Props) => {
//   return (
//     <div className="flex flex-col gap-8">
//       <Title
//         title="Share some basics about your place"
//         subTitle="When do you need the developer to start?"
//       />
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start overflow-y-auto">
//         {categories.map((item) => (
//           <SelectCard label="One engineer" icon={item.icon} />
//           // <CategoryInput
//           //   key={item.label}
//           //   label={item.label}
//           //   icon={item.icon}
//           //   onClick={(value: any) => setCustomValue('category', value)}
//           //   isSelected={category === item.label}
//           // />
//         ))}
//       </div>
//     </div>
//     // <div className="flex flex-col gap-8">
//     //   <Title
//     //     title="Share some basics about your place"
//     //     subTitle="When do you need the developer to start?"
//     //   />
//     //   <Counter
//     //     title="Number of guests"
//     //     subTitle="How many guests?"
//     //     value={guestCount}
//     //     onChange={(value) => setCustomValue('guestCount', value)}
//     //   />
//     //   <hr />
//     //   <Counter
//     //     title="Rooms"
//     //     subTitle="How many rooms do you have?"
//     //     value={roomCount}
//     //     onChange={(value) => setCustomValue('roomCount', value)}
//     //   />
//     //   <hr />
//     //   <Counter
//     //     title="Bathrooms"
//     //     subTitle="How many bathrooms do you have?"
//     //     value={bathroomCount}
//     //     onChange={(value) => setCustomValue('bathroomCount', value)}
//     //   />
//     // </div>
//   );
// };

// export default Info;
