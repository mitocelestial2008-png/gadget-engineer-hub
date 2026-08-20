# Gadget Engineer Hub

https://github.com/eskildssenrenan52-hash/pixel-gadget-hub.git traga o conteúdo do repo pra cá e considere a conversa anterior:

Skip to chat input





































Read

aurorion.png



Thought for 5s

Reviewing game state code

Reading engine and save actions

Reading battle module

Reading combat resolution

Reading turn ticks and shell

Reading menu and city hub

Thought for 10s

Checking gadget exports

Parei aqui por falta de créditos. Resumo do estado:



Pronto



Repositório importado para o projeto.

src/game/gadgets.ts com 120 gadgets únicos (1 por robô), 12 tipos de efeito, nível máx. 10, desbloqueio no nível 10 do robô, preços altos, custo de upgrade e nível de gadget para oponentes de IA.

Arte gerada em pixel art: 120 ícones fatiados em public/gadgets/<robotId>.png, prédio public/city/b_engineer.png e fundo do modal public/ui/bg_gadget_modal.png.

Falta (nada disso foi codado ainda)



src/game/save.ts: campo gadgets: Record<string, number> no estado + ações buyGadget/upgradeGadget, e propagar o nível em teamSaves.

src/game/engine.ts: gadgetLevel?: number em RobotSave.

src/game/battle.ts: campo gadget no Fighter (jogador via save, IA via aiGadgetLevel) e hooks dos efeitos em makeFighter (str/def/agl/hp/mp), doAttack (leech, thorns, crit, phase, amp, aegis) e tickEffects (regen).

src/components/game/hub-city.tsx: ampliar WORLD_W (~3100) e adicionar a Oficina do Engenheiro em x≈2820, com plataformas/núcleos na área nova.

src/screens/menu.tsx: adicionar "engineer" ao tipo Screen.

Novo src/screens/engineer.tsx: modal com o fundo gerado, lista de robôs nível 10+, compra e upgrade do gadget.

src/components/game/game-shell.tsx: renderizar a nova tela.

É só me chamar quando os créditos voltarem que eu concluo a implementação

faça o que falta agora.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6572dca9-3611-47c2-a080-df3261be12fb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
