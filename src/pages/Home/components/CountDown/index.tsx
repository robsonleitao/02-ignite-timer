import { useContext, useEffect } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function CountDown() {
    const {activeCycle, 
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFineshed,
        setSecondsPassed,
    } = useContext(CyclesContext)

    // convertendo minutos em segundos
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    // verificando quantos segundos já passaram
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    // convertendo os segundos restantes em minutos novamente
    const minutesAmount = Math.floor(currentSeconds / 60)

    // convertendo os minutos que não resultam valores inteiros para segundos novamente
    const secondsAmount = currentSeconds % 60

    // personalizando os minutos e segundos
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        let interval: number;

        if(activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), new Date(activeCycle.startDate))

                if(secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFineshed()
                    setSecondsPassed(totalSeconds)
                    clearInterval(interval)
                }else {
                    setSecondsPassed(secondsDifference)
                }
            }, 1000)

        }

        return () => {
            clearInterval(interval)
        }

    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFineshed])

    useEffect(() => {
        if(activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

    return (
        <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownContainer>
    )
}