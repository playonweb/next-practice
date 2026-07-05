import { InteractiveCounter } from '../InteractiveCounter';

export function ProductList({ data }: { data: { id: number, name: string }[] }) {
  return (
    <div className="grid gap-4">
      {data.map((item: any) => (
        <div key={item.id} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-slate-200 font-medium">{item.name}</span>
          
          {/* This is the Client Component Leaf */}
          <InteractiveCounter />
        </div>
      ))}
    </div>
  );
}
