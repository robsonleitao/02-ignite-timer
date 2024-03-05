import { createContext, useContext, useState } from "react";

const HomeContext = createContext({} as any);

function ComponenteA() {
    const { num } = useContext(HomeContext);
    return <h1>Componente A: {num}</h1>;
}

function ComponenteB() {
    const { num, somarNumero } = useContext(HomeContext);

    return (
        <h1>
            Componente B: {num}
            <br />
            <button onClick={somarNumero}>Somar + 1</button>
        </h1>
    );
}

export function Home() {
    const [num, setNum] = useState(0);

    function somarNumero() {
        setNum(num + 1); // Atualiza o estado somando 1 ao valor atual
    }

    return (
        <HomeContext.Provider value={{ num, somarNumero }}>
            <ComponenteA />
            <ComponenteB />
        </HomeContext.Provider>
    );
}
