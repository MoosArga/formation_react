import { useEffect, useMemo, useState } from "react";
import type { Formation } from "../models/formation";
import type { FormationStat } from "../models/formation-stat";

type FormationsHook = {
    formations: Formation[];
    stats: FormationStat[];
    refresh: () => void;
}

export default function useFormations(): FormationsHook {

    const [formations, setFormations] = useState<Formation[]>([]);

    const [refreshRate, setRefreshRate] = useState<number>(0);

    const formationsStats = useMemo<FormationStat[]>(() => {
        return calculateStats(formations);
    }, [formations])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/formations');
            if (response.ok) {
                const data = await response.json()
                setFormations(data as Formation[]);
            } 
        }

        fetchData();
    }, [refreshRate])

    function refresh() {
        setRefreshRate(old => old + 1)
    }

    return { formations, stats: formationsStats, refresh };

}

// O(n)
function calculateStats(formations: Formation[]) {
    const result: FormationStat[] = [];
    
    // Indexation de mes formations par type de formation
    const formationByType = new Map<string, Formation[]>();
    formations.forEach(f => {
        if (!formationByType.has(f.typeF)) {
            formationByType.set(f.typeF, []);
        }
        formationByType.get(f.typeF)!.push(f);

        // formationByType.set(f.typeF, [...(formationByType.get(f.typeF) || []), f])
    });

    // Statistique par type de formation
    formationByType.forEach((forms, typeF) => {
        const nbFormation = forms.length;
        result.push({
            typeF,
            nbFormation,
            noteMoyenne: forms.reduce((a, b) => a + b.note, 0) / nbFormation,
            chargeHCumulee: forms.reduce((a, b) => a + b.chargeH, 0)
        });
    });

    return result;
}

// O(n²) ou O(n log(n))
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function calculateStatsWithoutMap(formations: Formation[]): FormationStat[] {
    const result: FormationStat[] = [];

    formations.forEach(f => {
        const currentFType = result.find(fs => fs.typeF === f.typeF)
        if(currentFType) {
            currentFType.nbFormation += 1;
            currentFType.noteMoyenne += f.note;
            currentFType.chargeHCumulee += f.chargeH;
        } else {
            result.push({
                typeF: f.typeF,
                nbFormation: 1,
                noteMoyenne: f.note,
                chargeHCumulee: f.chargeH
            })
        }
    })

    return result.map(fs => {
        fs.noteMoyenne = fs.noteMoyenne / fs.nbFormation;
        return fs;
    });
}
