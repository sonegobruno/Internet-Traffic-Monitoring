import React, { useEffect, useState, useCallback, useMemo, FormEvent } from 'react';

import { FiSearch, FiPauseCircle} from 'react-icons/fi';

import getSpeedInformation from '../../utils/getSpeedInformation';

import sbsLogo from '../../assets/sbs.png';

import './styles.css';

export interface ICostumerInternetInformation {
  pppoe: string;
  download: string;
  upload: string;
  timeResponseServer: string;
  consultaStart: string;
}

const Main:React.FC = () => {

    const [ pppoe, setPPPoE ] = useState('');
    const [ loop, setLoop ] = useState(false);
    const [ data, setData ] = useState<ICostumerInternetInformation>({} as ICostumerInternetInformation);

    const tableContent = useMemo(() => {
      return [
        { title: 'Cliente:', value: data.pppoe},
        { title: 'Download:', value: data.download},
        { title: 'Upload:', value: data.upload},
        { title: 'Resposta:', value: data.timeResponseServer},
        { title: 'Horario:', value: data.consultaStart},
      ]
    },[data]);


    useEffect(() => {
        handleDataApi();
    },[loop, data,])

    const handleDataApi = useCallback(async () => {
        if(loop === true ) {
            try {

                const { download, upload, timeResponseServer, consultaStart } = await getSpeedInformation(pppoe);

                const costumerSpeedInformationFormatted = {
                    pppoe,
                    download: `${download} Mb/m`,
                    upload: `${upload} Mb/m`,
                    timeResponseServer: `${timeResponseServer} s`,
                    consultaStart: `${consultaStart} hr`,
                };

                setData(costumerSpeedInformationFormatted);

            } catch (err) {
                alert(err.message);
                setPPPoE('');
                setLoop(false);
            }
        }
    },[loop, pppoe]);

    const handleLoop = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(loop === false) {
            setLoop(true);
        } else {
            setLoop(false);
            setTimeout(() => {
                setPPPoE('');
                setData({
                  pppoe: '',
                  download: '',
                  consultaStart: '',
                  timeResponseServer: '',
                  upload: '',
                });
            }, 2000);
        }
    },[loop]);


    return (
        <div className="container">
            <div className="header">
                <img src={sbsLogo} alt="SBS"/>

                <form onSubmit={handleLoop}>
                    <input
                        disabled={loop===true}
                        placeholder="Digite aqui o PPPoE"
                        value={pppoe}
                        onChange={e => setPPPoE(e.target.value)}
                    />

                    {loop === false
                        ? <button type="submit"><FiSearch size={18} color="green"/></button>
                        : <button type="submit"><FiPauseCircle size={18} color="red"/></button>
                    }
                </form>

            </div>

            <div className="table">
                <h2>Media de velocidade (Mb/m):</h2>
                <table>
                    <tbody>
                        {tableContent.map(table => (
                            <tr key={table.title}>
                                <th>{table.title} </th>
                                <td>{table.value} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Main;
