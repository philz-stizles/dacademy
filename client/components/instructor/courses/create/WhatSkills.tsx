// import { Check } from 'lucide-react';
// import { CountrySelect } from '../../../inputs';
// import { Title } from '../../../ui';
// import Notification from '../../../ui/Notification/Notification';

// type Props = {
//   category: any;
//   setCustomValue: (id: string, value: any) => void;
// };

// const WhatSkills = ({ category, setCustomValue }: Props) => {
//   return (
//     <div className="flex flex-col gap-8">
//       <Title
//         title="What skills would you like to see in your new team?"
//         subTitle="Select the desired areas of expertise"
//       />

//       <CountrySelect
//         value={category}
//         onChange={(value) => setCustomValue('location', value)}
//       />

//       <div className="py-12">
//         <h3 className="">
//           Popular skills for <strong>Software Developers:</strong>{' '}
//         </h3>
//         <div className="flex flex-wrap gap-3 py-5">
//           <Option label="Python" />
//           <Option label="React" />
//           <Option label="Next" />
//           <Option label="Angular" />
//           <Option label="Vue" />
//           <Option label="Go" />
//           <Option label="Node" />
//           <Option label="CSS" />
//           <Option label="SQL" />
//         </div>
//       </div>

//       {/* <div className="flex flex-col gap-8">
//       <Heading
//         title="Which of these best describes your place?"
//         subTitle="Pick a category"
//       />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
//         {categories.map((item) => (
//           <CategoryInput
//             key={item.label}
//             label={item.label}
//             icon={item.icon}
//             onClick={(value: any) => setCustomValue('category', value)}
//             isSelected={category === item.label}
//           />
//         ))}
//       </div> */}
//     </div>
//   );
// };

// const Option = ({ label }: { label: string }) => {
//   return (
//     <div className="border border-gray-400 text-sm font-medium rounded-md py-2.5 px-5 transition-all cursor-pointer hover:bg-indigo-700 hover:text-white">
//       {label}
//     </div>
//   );
// };

// export default WhatSkills;
