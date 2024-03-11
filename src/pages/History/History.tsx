import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import {formatDistanceToNow} from 'date-fns'
import {ptBR} from 'date-fns/locale/pt-BR'

export function History() {
    const {cycles} = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>
        <pre>
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
                        {cycles.map(cycle => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutos</td>
                                    <td>{formatDistanceToNow(cycle.startDate, {
                                        addSuffix: true,
                                        locale: ptBR
                                    })}</td>
                                    <td>
                                        {cycle.fineshedDate && <Status statusColor="green">Concluido</Status>}
                                        {cycle.interruptDate && <Status statusColor="red">Interrompido</Status>}
                                        {!cycle.interruptDate && !cycle.fineshedDate && <Status statusColor="yellow">Em andamento</Status>}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}