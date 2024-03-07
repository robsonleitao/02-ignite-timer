import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History() {
    const {cycles} = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>
        <pre>
            {JSON.stringify(cycles, null, 2)}
        </pre>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>status</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>uma tarefa</td>
                            <td>20 minutos</td>
                            <td>há 2 meses</td>
                            <td>
                                <Status statusColor="green">
                                    Concluido
                                </Status>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}