export const typesData = {
    "normal": {
        "attack": {
            "double": [],
            "half": ["rock", "steel"],
            "zero": ["ghost"]
        },
        "defense": {
            "half": [],
            "double": ["fighting"],
            "zero": ["ghost"]
        }
    },
    "fire": {
        "attack": {
            "double": ["grass", "ice", "bug", "steel"],
            "half": ["fire", "water", "rock", "dragon"],
            "zero": []
        },
        "defense": {
            "half": ["fire", "grass", "ice", "bug", "steel", "fairy"],
            "double": ["water", "ground", "rock"],
            "zero": []
        }
    },
    "water": {
        "attack": {
            "double": ["fire", "ground", "rock"],
            "half": ["water", "grass", "dragon"],
            "zero": []
        },
        "defense": {
            "half": ["fire", "water", "ice", "steel"],
            "double": ["electric", "grass"],
            "zero": []
        }
    },
    "electric": {
        "attack": {
            "double": ["water", "flying"],
            "half": ["electric", "grass", "dragon"],
            "zero": ["ground"]
        },
        "defense": {
            "half": ["electric", "flying", "steel"],
            "double": ["ground"],
            "zero": []
        }
    },
    "grass": {
        "attack": {
            "double": ["ground", "rock", "water"],
            "half": ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"],
            "zero": []
        },
        "defense": {
            "half": ["ground", "water", "grass", "electric"],
            "double": ["flying", "poison", "bug", "fire", "ice"],
            "zero": []
        }
    },
    "ice": {
        "attack": {
            "double": ["grass", "ground", "flying", "dragon"],
            "half": ["fire", "water", "ice", "steel"],
            "zero": []
        },
        "defense": {
            "half": ["ice"],
            "double": ["fire", "fighting", "rock", "steel"],
            "zero": []
        }
    },
    "fighting": {
        "attack": {
            "double": ["normal", "ice", "rock", "dark", "steel"],
            "half": ["poison", "flying", "psychic", "bug", "fairy"],
            "zero": ["ghost"]
        },
        "defense": {
            "half": ["bug", "rock", "dark"],
            "double": ["flying", "psychic", "fairy"],
            "zero": []
        }
    },
    "poison": {
        "attack": {
            "double": ["grass", "fairy"],
            "half": ["poison", "ground", "rock", "fairy"],
            "zero": ["steel"]
        },
        "defense": {
            "half": ["fighting", "poison", "bug", "grass", "fairy"],
            "double": ["ground", "psychic"],
            "zero": []
        }
    },
    "ground": {
        "attack": {
            "double": ["fire", "electric", "poison", "rock", "steel"],
            "half": ["grass", "bug"],
            "zero": ["flying"]
        },
        "defense": {
            "half": ["poison", "rock"],
            "double": ["water", "grass", "ice"],
            "zero": ["electric"]
        }
    },
    "flying": {
        "attack": {
            "double": ["grass", "fighting", "bug"],
            "half": ["electric", "rock", "steel"],
            "zero": []
        },
        "defense": {
            "half": ["grass", "fighting", "bug"],
            "double": ["electric", "ice", "rock"],
            "zero": ["ground"]
        }
    },
    "psychic": {
        "attack": {
            "double": ["fighting", "poison"],
            "half": ["psychic", "steel"],
            "zero": ["dark"]
        },
        "defense": {
            "half": ["fighting", "psychic"],
            "double": ["bug", "ghost", "dark"],
            "zero": []
        }
    },
    "bug": {
        "attack": {
            "double": ["grass", "psychic", "dark"],
            "half": ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"],
            "zero": []
        },
        "defense": {
            "half": ["grass", "fighting", "ground"],
            "double": ["fire", "flying", "rock"],
            "zero": []
        }
    },
    "rock": {
        "attack": {
            "double": ["fire", "ice", "flying", "bug"],
            "half": ["fighting", "ground", "steel"],
            "zero": []
        },
        "defense": {
            "half": ["normal", "fire", "poison", "flying"],
            "double": ["water", "grass", "fighting", "ground", "steel"],
            "zero": []
        }
    },
    "ghost": {
        "attack": {
            "double": ["psychic", "ghost"],
            "half": ["dark"],
            "zero": ["normal"]
        },
        "defense": {
            "half": ["poison", "bug"],
            "double": ["ghost", "dark"],
            "zero": ["normal", "fighting"]
        }
    },
    "dragon": {
        "attack": {
            "double": ["dragon"],
            "half": ["steel"],
            "zero": ["fairy"]
        },
        "defense": {
            "half": ["fire", "water", "electric", "grass"],
            "double": ["ice", "dragon", "fairy"],
            "zero": []
        }
    },
    "dark": {
        "attack": {
            "double": ["psychic", "ghost"],
            "half": ["fighting", "dark", "fairy"],
            "zero": []
        },
        "defense": {
            "half": ["ghost", "dark"],
            "double": ["fighting", "bug", "fairy"],
            "zero": ["psychic"]
        }
    },
    "steel": {
        "attack": {
            "double": ["ice", "rock", "fairy"],
            "half": ["fire", "water", "electric", "steel"],
            "zero": []
        },
        "defense": {
            "half": ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy"],
            "double": ["fire", "fighting", "ground"],
            "zero": ["poison"]
        }
    },
    "fairy": {
        "attack": {
            "double": ["fighting", "dragon", "dark"],
            "half": ["fire", "poison", "steel"],
            "zero": []
        },
        "defense": {
            "half": ["fighting", "bug", "dark"],
            "double": ["poison", "steel"],
            "zero": ["dragon"]
        }
    },
};

export type typeDataKeys = "normal" | "fire" | "water" | "electric" | "grass" | "ice" | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug" | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy"