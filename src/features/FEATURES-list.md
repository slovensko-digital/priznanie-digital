
# struktura
- /src/features/NAMESPACE/FEATURE/*.files   - vsetky subory su takto povnarane na namespace (context) a featuru, vnutri su subory
- /src/features/_shared/FEATURES/*          - v _shared su zdielane veci napriec projektom, a pod nim tiez features
- /src/features/NAMESPACE/FEATURE/..        - vnutri featury sa moze nachadzat:
    - SUBFEATURE/                           - ..nejaka subfeatura - je to lepsie delit takto, aby bolo jasne co to robi
    - _types/                               - ..ak to neni nic konkretne, ale skor pomocne veci, tak podla typu s underscorom folder
    - _components/                          - ..komponenty ktore nie su samostatnou featurou mozu byt takto
    - _utils/                               - ..utilitky ktore nemaju jasnu featuru, sa daju odlozit sem


# features/
    _shared/
        _utils
        calculation
        forms
        links
        pages
        styles
        taxform
        testing
    app/
        _layout
        404
        app
        home
    steps/
        1-prijmy
        2-zamestnanie
        3-manzelstvo
        3b-deti
        3c-hypoteka
        3d-dve-percenta
        4-dochodok
        5-osobne-udaje
    summary/
        6-suhrn
        7-vratenie-preplatku
        8-vypocet-dane
        9-pokracovat
    odklad/
        1-prijmy
        2-osobne-udaje
        3-suhrn
        4-pokracovat
    api/
        _utils

