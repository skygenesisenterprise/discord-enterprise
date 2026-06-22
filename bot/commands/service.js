import { SlashCommandBuilder } from "discord.js";
export const data=new SlashCommandBuilder().setName("service").setDescription("Consulte l’état des services configurés.").addStringOption(o=>o.setName("name").setDescription("Nom du service"));
export async function execute(i){const name=i.options.getString("name");await i.reply({content:name?`Service ${name}: état non connecté à l’API de supervision.`:"Aucun registre de services n’est encore connecté au bot.",ephemeral:true});}
