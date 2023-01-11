
# struktura
- /src/features/NAMESPACE/FEATURE/*.files   - vsetky subory su takto povnarane na namespace (context) a featuru, vnutri su subory
- /src/features/_shared/FEATURES/*          - v _shared su zdielane veci napriec projektom, a pod nim tiez features
- /src/features/NAMESPACE/FEATURE/..        - vnutri featury sa moze nachadzat:
    - SUBFEATURE/                           - ..nejaka subfeatura - je to lepsie delit takto, aby bolo jasne co to robi
    - _types/                               - ..ak to neni nic konkretne, ale skor pomocne veci, tak podla typu s underscorom folder
    - _components/                          - ..komponenty ktore nie su samostatnou featurou mozu byt takto
    - _utils/                               - ..utilitky ktore nemaju jasnu featuru, sa daju odlozit sem


# features/* namespaces
    _shared/        - tu su zdielane utilitky a komponenty, ktore sa nedaju vnorit pod jednu feature alebo pod jediny namespace
    app/            - tu su uvodne stranky, root component app, a univerzalne stranky nepatriace k nijakemu namespacu ale pre celu stranku
    steps/          - tu su hlavne kroky danoveho priznania vramci vyplnania userom po ktorych sa dostane k sumaru
    summary/        - tu su sumarne obrazovky pre uz vyplnene danove priznanie az po koniec celeho scenaria
    odklad/         - tu su obrazovky pre scenario odkladu danoveho priznania
    api/            - tu su utilitky ktore nie su univerzalne pre vsetko, ale su unikatne len pre api
