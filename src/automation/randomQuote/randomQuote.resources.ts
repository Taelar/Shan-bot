import { EmojiKey } from '../../model'

const PERCEVAL_QUOTES = [
	"Après demain, à partir d'aujourd'hui ?",
	'Le code c\'est "le code" ? Ça va, ils se sont pas trop cassés le bonnet, pour l\'trouver celui-là !',
	"Faut faire comme avec les scorpions qui se suicident quand ils sont entourés par le feu, faut faire un feu en forme de cercle, autour d'eux, comme ça ils se suicident, pendant que nous on fait le tour et on lance de la caillasse de l'autre côté pour brouiller... Non ?",
	'Si on faisait le coup du bouclier humain ? Par exemple, Sire, Léodagan et moi on fait semblant de vous prendre en otage : on vous met une dague sous le cou et on traverse le camp adverse en gueulant : " Bougez pas, bougez pas ou on bute le Roi!"...',
	'Putain, en plein dans sa mouille !',
	"Si c'est le même volume sonore, on dit équidistant. S'ils sont équidistants en même temps que nous, on peut repérer le dragon par rapport à une certaine distance. Si le dragon s'éloigne, on sera équidistant, mais ça sera vachement moins précis et pas réciproque.",
	"Une fois, à une exécution, je m'approche d'une fille. Pour rigoler, je lui fais : Vous êtes de la famille du pendu ? C'était sa soeur. Bonjour l'approche !",
	'Faut arrêter ces conneries de nord et de sud ! Une fois pour toutes, le nord, suivant comment on est tourné, ça change tout !',
	'Toi un jour je te crame ta famille, toi.',
	"Donc, pour résumer, je suis souvent victime des colibris, sous-entendu des types quoublient toujours tout. Euh, non... Bref, tout ça pour dire, que je voudrais bien qu'on me considère en tant que tel.",
	"On a même un tabouret ! Quand on s'assoit d'ssus, on se retrouve sur un autre tabouret dans une taverne dans le Languedoc ! Ouais, le siège de transport qu'ils appellent. En plus, comme par hasard c'est moi qui ai essayé le premier. Deux semaines et demie plus le bateau qu'ça m'a pris pour revenir. J'avais pas compris qu'en me rasseyant dessus, ça me ramenait de l'autre côté. Et à l'arrivée j'me suis fait mettre une chasse, parce que j'avais ramené l'autre tabouret, et que soit-disant il aurait fallu qu'il reste là-bas. Pourtant ils marchent les deux tabourets ! Eh ben ils sont l'un à côté de l'autre. Alors ça fait pas pareil.",
	"C'est pour ça : j'lis jamais rien. C'est un vrai piège à cons c't'histoire-là. En plus j'sais pas lire.",
	"Si Joseph d'Arimathie a pas été trop con, vous pouvez être sûr que le Graal, c'est un bocal à anchois.",
	"C'est pas faux!",
	"Excusez, c'est juste pour vous dire que je vais pas pouvoir rester aujourd'hui ! Faut que je retourne à la ferme de mes vieux ! Y a ma grand-mère qui a glissé sur une bouse ! C'est le vrai merdier !",
	"Moi, j'serais vous, je vous écouterais... Non, moi, j'serais nous, je vous... Si moi j'étais vous, je vous écouterais ! Non, elle me fait chier, cette phrase !",
	'Sire, Sire ! On en a gros !',
	"C'est marrant les petits bouts de fromage par terre. C'est ça que vous appelez une fondue ?",
	"J'voudrais pas faire ma raclette, mais la soirée s'annonce pas super.",
	"Dans la vie, j'avais deux ennemis : le vocabulaire et les épinards. Maintenant j'ai la botte secrète, et je bouffe plus d'épinards. Merci de rien, au revoir messieurs dames.",
	"De toutes façons, les réunions de la Table Ronde c'est deux fois par mois. Donc, si le mec il dit après-demain à partir de dans deux jours, suivant s'il le dit à la fin du mois, ça reporte.",
	'Là, vous faites sirop de vingt-et-un et vous dites : beau sirop, mi-sirop, siroté, gagne-sirop, sirop-grelot, passe-montagne, sirop au bon goût.',
	'Et toc ! Remonte ton slibard, Lothard !',
	"13, 14, 15... Enfin tous les chiffres impairs jusqu'à 22.",
	"Alors là, c'est Ashton, lui c'est Rutz, lui c'est Pierce, l'autre derrière c'est Pierce aussi, j'ai jamais compris pourquoi, et lui euh, j'crois qu'il a pas d'prénom, tout le monde l'appelle Ccnnard.",
	'PAYS DE GALLES INDÉPENDANT !',
	"Karadoc, c'est le gars brillant. Le frère, à côté, c'est sûr... C'est vraiment un gros con.",
	"Sans blague on pourrait pas fêter la mort des mecs que je connais pour une fois ? C'est toujours la mort de vos potes à vous que l'on fête, moi dans quatre jours c'est l'anniversaire de la mort d'un oncle à moi, sans faire exprès il s'est tiré dessus avec un arc.",
	"Le Graal, c'est une vraie saloperie, méfiez-vous. Un jour c'est un vase, une semaine après une pierre incandescente. [...] Incandescente, c'est : qui peut accaparer des objets sans resurgir sur autrui.",
	"Y'a du grabuge alors on appelle les 2 couillons... On met les glandus à profit !",
	"Ça prouve que j'ai de l'ubiquité... De l'humilité ? C'est pas quand il y a des infiltrations ?",
	'À ROULEEEEETTES !!',
	"Ah, mais c'est de là que ça vient ! Quand on dit \"ça va comme sur des roulettes\". En fait ça veut dire qu'le mec il peut balancer un morceau de rocher comme une catapulte, il continue quand même d'avancer d'façon mobile.",
	"Une maquette ?! Vous avez pas dit qu'c'était une catapulte ?",
	"Les 3 actes, c'est les bonnes femmes qui sont mi-taupes mi-déesses, et qui ont forcé les mecs de Bethléem à construire les pyramides.",
	"Dans le Languedoc, ils m'appellent Provençal. Mais c'est moi qui m'suis gouré en disant mon nom. Sinon, en Bretagne, c'est le Gros Faisan au sud, et au nord, c'est juste Ducon ..",
	"Au printemps, j'aime bien pisser du haut des remparts au lever du soleil… Y'a une belle vue !",
	'Sur une échelle de 2 à 76, et là je préfère prendre large, de 2 à 71 on ne nous écoute pas, de 72 à 75, on nous écoute toujours pas, et seulement à 76 on nous laisse parler sans nous engueuler.',
	"Mais cherchez pas à faire des phrases pourries... On en a gros, c'est tout !",
	"En plus je connais une technique pour tuer trois hommes en un coup rien qu'avec des feuilles mortes ! Alors là, vous êtes deux, vous avez bien de la chance.",
	"Vous vous prenez pour un enseignant ?... Non j' s'entais que c'était le moment d'faire une vanne mais y'a rien qui est sorti.",
	"Bon ça suffit maintenant ! Vous voulez qu'j'me foute en rogne comme un enseignant ? ... Qu'est ce que j'ai avec ça moi ?",
	'On va pas installer notre carré germinal à la taverne!',
	"Elle a compris la vilaine frisée ? On a dans l'projet de fonder un clan autonome pour partir à l'aventure et ramener du pognon pour entretenir vos grosses miches ! Alors le cageot il dit merci et il ferme sa boîte à caca !",
	"Vous, vous avez une idée derrière la main, j'en mettrais ma tête au feu !",
	"Je vais vous poser une série de questions. Vous répondez par oui, non, ou Zbradaraldjan. Ok c'est parti : où se trouve l'oiseau ?... Allez c'est facile ça. Trouve pas ? Bon tant pis. C'était \"sur la branche\". Eh oui, y a des pièges.",
	"Ma tante me demande de trouver un endroit pour y entreposer 667 noix. A la cave il y a de la place pour 595, à la remise il y a la place pour 337. Qu'est-ce que je fais ? Je les ?... Allez on cherche bon dieu ! Je les... Zbradaraldjan le grenier!... Allez il dégage le bourrin !",
	"Et si je sens que y a des anguilles à la broche, dehors ! Comme César quand il a chassé les marchands du temple, et qu'ils ont foutu le camp sur le bateau avec les bestioles et l'pépé.",
	"Je crois que c'est rentré par là, et c'est ressorti par là ; et c'est re-rentré par là, et c'est RE-RE-SORTI PAR LA. ET NOUS ON S'SAIGNE AUX QUATRE FROMAGES !!!",
	"Allez, y'a plein de bruit, là ! Si ça se trouve c'est bourré d'oiseaux venimeux. Y'en a des rouges, des jaunes, des re-rouges et des pourpres ! Y bouffent que des noisettes et des escalopes de veau. Et quand ils vous donnent un coup de bec vous voyez une grande lumière et ça vous donne la diarrhée !",
	"Nan mais je l'ai déjà impressionné, moi ! Je lui ai expliqué une nouvelle technique de combat : on se bat à moitié à mains nues, et à moitié avec du calcium. J'peux vous dire il faisait moins le malin !",
	"Ah ça y'est, j'viens de comprendre à quoi ça sert la canne. En fait ça sert à rien… Du coup ça nous renvoie à notre propre utilité : l'Homme face à l'Absurde !",
	"Moi, la canne, ça m'aide. Je visualise le caillou dans l'eau, j'ai l'impression de faire partie d'un tout, moi, le caillou, le fil, le lac, le ciel, c'est entier, vous comprenez ? C'est bien fini. C'est pour ça, moi je me dis, c'est dans ces moments-là qu'on peut bien comprendre des trucs. Vous me prenez pour un con, non ?",
	"Moi, j'serais vous, je vous écouterais... Non, moi, j'serais nous, je vous... Si moi, j'étais vous, je vous écouterais ! Non, elle me fait chier, cette phrase !",
	'Ils ont pas de bol, quand même ! Mettre au point un truc pareil et tomber sur des cerveaux comme nous !',
	"Salut, Sire. Je trouve qu'il fait beau, mais encore frais, mais beau !",
	"C'est l'anniversaire dans tous les recoins, c'est presque tous les ans qu'on a l'anniversaire. Grâce à cet anni... c'est la joie c'est pratique, c'est au moins un principe à retenir pour faire la frite... c'est huuuum lalalalala. Cette année c'est bien, l'anniversaire tombe à pic !",
	'LEODAGAN CONTRE-ATTAQUE !!!',
	"C'qui compte, c'est les valeurs !",
	"C'est moi qui remporte le tour. Quand on remporte le tour à Sloubi, on a quatorze solutions possibles : soit on annule le tour ; soit on passe ; soit on change de sens ; soit on recalcule les points ; soit on compte ; soit on divise par six ; soit on jette les bouts de bois de quinze pouces, ça c'est quand on joue avec les bouts de bois ; soit on se couche ; soit on joue sans atouts. Et après y'a les appels : plus un ; plus deux ; attrape oiseaux ; régoudon ; ou chante Sloubi. Comme vous êtes second, vous avez plus que dix-neuf solutions possibles : soit vous passez ; soit vous sciez en deux les cinquante poutrelles de trente pieds, mais ça c'est quand on joue avec les bouts de bois. Sinon c'est les relances : doublette ; jeu carré ; jeu de piste ; jeu gagnant ; jeu moulin ; jeu-jeu ; joue-jeu ; joue-joue ; joue-jié ; joue-ganou ; gagnar ; catakt ; tacat ; cacatac ; cagat-cata et ratacat-mic. Ou : chante Sloubi. Nous, on va faire que chante Sloubi.",
	'Sloubi 1, sloubi 2, sloubi 3, sloubi 4, sloubi 5 [...] sloubi 324, sloubi 325!...',
	"SI VOUS VOULEZ QU'ON SORTE LES PIEDS DEVANT, FAUDRA NOUS PASSER SUR L'COOOORPS !",
	'Non, vous, vous vous maravez. Quand on a pas de technique, il faut y aller à la zob.',
	"Par contre pas un mot là, sinon la porte. Bon là y en a pas, mais ce n'est pas la première fois qu'on fabrique une porte à la dernière minute pour virer un petit trou de balle qui fait son malin.",
	"Progressif... N'oubliez pas, dans la casse, le plus important, c'est les suites d'épaisseurs ... Bûche de 10, Bûche de 16; Bûche de 32, Bûbûche, Bibuchette, et re-Bûche de 6 !!!",
	"Si on avait bu un coup dans des trucs qui s'cassent, j'en aurais pété un par terre avant d'monter dans ma chambre, pour bien montrer comment j'suis colère.",
	"On a une autorité naturelle, il faut en profiter... J'suis sûr que même à poil on ferait toujours chef !",
	'Si la mémoire est à la tête ce que le passé, peut-on y accéder à six ? Oui, non, zbradaraldjan ?',
	"C'est vraiment chouette comme rêve... Moi l'autre nuit j'ai rêvé que Karadoc avait des pinces... Comme un crabe... Il me pinçait le ménisque... Comparés aux vôtres, ils sont pourris mes rêves, ou pas?",
]

interface RandomQuoteEntry {
	emoji: EmojiKey
	quotes: Array<string>
}

export const RANDOM_QUOTES: Array<RandomQuoteEntry> = [
	{ emoji: 'Perceval', quotes: PERCEVAL_QUOTES },
]
