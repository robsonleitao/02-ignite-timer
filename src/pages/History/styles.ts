import styled from "styled-components";

interface StatusProps {
    status_color: keyof typeof STATUS_COLOR
}

const STATUS_COLOR = {
    yellow: 'yellow-500',
    red: 'red-500',
    green: 'green-500',
} as const

export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.5rem;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 1.5rem;
        color: ${(props) => props.theme["gray-100"]};
    }

`

export const HistoryList = styled.div`
    flex: 1;
    /* esse overflow vai servir para quando a aplicação for aberta num mobile
    a tabela tera uma rolagem lateral para nao quebrar o layout. */
    overflow: auto;
    margin-top: 2rem;

    table {
        width: 100%;
        /* essa propriedade retira as bordas das celulas da tabela */
        border-collapse: collapse;
        min-width: 660px;

        th {
            background-color: ${(props) => props.theme["gray-600"]};
            padding: 1rem;
            text-align: left;
            color: ${(props) => props.theme["gray-100"]};
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child {
                border-top-left-radius: 8px;
                padding-left: 1rem;
            }

            &:last-child {
                border-top-right-radius: 8px;
                padding-right: 1rem;
            }
        }

        td {
            background-color: ${(props) => props.theme["gray-700"]};
            border-top: 4px solid  ${(props) => props.theme["gray-800"]};
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child {
                padding-left: 1rem;
                width: 50%;
            }

            &:last-child {
                padding-right: 1rem;
            }
        }
    }
`

export const Status = styled.span<StatusProps>`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: ${(props) => props.theme[STATUS_COLOR[props.status_color]]};
    }
`