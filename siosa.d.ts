type Class =
  | "Templar"
  | "Marauder"
  | "Ranger"
  | "Witch"
  | "Duelist"
  | "Shadow"
  | "Scion";

type Ascendancies =
  | "Ascendant"
  | "Slayer"
  | "Gladiator"
  | "Champion"
  | "Assassin"
  | "Saboteur"
  | "Trickster"
  | "Juggernaut"
  | "Berserker"
  | "Chieftain"
  | "Necromancer"
  | "Elementalist"
  | "Occultist"
  | "Deadeye"
  | "Raider"
  | "Pathfinder"
  | "Inquisitor"
  | "Hierophant"
  | "Guardian";

type Realm = "PC" | "XBOX" | "PS3";

type Item = {
  id: string;
  $t: string;
};

type Slot = {
  name: string;
  itemId: string;
};

type ItemSet = {
  useSecondWeaponSet: string;
  id: string;
  Slot: Array<Slot>;
};

type Gem = {
  enableGlobal2: string;
  skillMinionSkillCalcs: string;
  skillMinionCalcs: string;
  quality: string;
  level: string;
  gemId: string;
  skillId: string;
  skillMinionSkill: string;
  enableGlobal1: string;
  enabled: string;
  nameSpec: string;
  skillMinion: string;
};

type Socket = { nodeId: string; itemId: string };

type Spec = {
  title: string;
  treeVersion: string;
  URL: string;
  Sockets: Array<Socket>;
};

type BuildDetails = {
  level: number;
  targetVersion: string;
  banditNormal: string;
  bandit: string;
  banditMerciless: string;
  className: Class;
  ascendClassName: Ascendancies;
  mainSocketGroup: number;
  viewMode: string;
  banditCruel: string;
  PlayerStat: Array<{ stat: string; value: string }>;
  MinionStat: Array<{ stat: string; value: string }>;
};

interface Build {
  PathOfBuilding: {
    Build: BuildDetails;
    Import: {
      lastAccountHash: string;
      lastRealm: Realm;
      lastCharacterHash: string;
    };
    Calcs: {
      Input: Array<{ name: string; number: string }>;
      Section: Array<{ collapsed: boolean; id: string }>;
    };
    Skills: {
      defaultGemQuality: string;
      defaultGemLevel: string;
      sortGemsByDPS: string;
      Skill: Array<{
        mainActiveSkillCalcs: string;
        label: string;
        enabled: string;
        slot: string;
        mainActiveSkill: string;
        Gem: Array<Gem> | Gem;
      }>;
    };
    Tree: {
      activeSpec: string;
      Spec: Array<Spec>;
    };
    Notes: string;
    TreeView: {
      searchStr: string;
      zoomY: string;
      zoomLevel: string;
      showStatDifferences: string;
      zoomX: string;
    };
    Items: {
      activeItemSet: string;
      useSecondWeaponSet: string;
      Item: Array<Item>;
      Slot: Slot;
      ItemSet: ItemSet;
    };
    Config: Array<{ [key: string]: string }>;
  };
}

type Params = "ascendancy" | "skill";
type SearchParams = { [key: Params]: string };

type Result = {
  id: number;
  createdAt: string;
  updatedAt: string;
  pob: Build;
};

type SearchResults = { numberOfBuilds: number; builds: Array<Result> };
