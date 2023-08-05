export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-4xl font-bold my-4 mx-10">{children}</h2>;
}

export function SectionDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-3xl my-4 mx-10">{children}</p>;
}

export function TableTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-3xl font-bold my-4 mx-auto w-10/12">{children}</h3>;
}

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="text-2xl my-4 mx-auto w-10/12 table-fixed">
      {children}
    </table>
  );
}

export function ThCell({ children }: { children: React.ReactNode }) {
  return (
    <th className="border border-gray-500 bg-sky-300 py-5 text-left px-2">
      {children}
    </th>
  );
}

export function TdCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="border border-gray-500 bg-sky-100 px-2 py-2">{children}</td>
  );
}
